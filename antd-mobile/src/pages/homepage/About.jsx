import React, { useEffect, useState } from "react";
import { Button, Form, Input, Dialog, Toast, DotLoading } from "antd-mobile";
import { getCustomMe, updateCustomMe } from "../../services/api";

function UserAbout({ visible, onClose }) {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const jwt = localStorage.getItem("jwt");

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCustomMe(jwt);
        console.log("User data:", userData);
        
        // Ensure professionjson is an object
        if (!userData.professionjson) {
          userData.professionjson = {};
        }
             setUser(userData);
      } catch (err) {
        setError(err.message);
        Toast.show({
          icon: "fail",
          content: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [jwt]);

  // Set form field with current "About Me" value when user data loads
  useEffect(() => {
    if (user && user.professionjson) {
      form.setFieldsValue({ aboutme: user.professionjson.aboutme || "" });
    }
  }, [user, form]);

  // When dialog opens, reset the form and set the current value
  useEffect(() => {
    if (visible && user && user.professionjson) {
      form.resetFields();
      form.setFieldsValue({ aboutme: user.professionjson.aboutme || "" });
    }
  }, [visible, form, user]);

  // Handle form submission: validate and update user's aboutme field
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Submitted Successfully:", values);
      
      setSubmitting(true);
      
      // Create updated professionjson
      const updatedProfessionJson = {
        ...user.professionjson,
        aboutme: values.aboutme,
      };
      
      // Send only the updated professionjson field
      await updateCustomMe(jwt, {
        professionjson: updatedProfessionJson
      });
      
      // Update local state
      setUser({
        ...user,
        professionjson: updatedProfessionJson,
      });

      Toast.show({
        icon: "success",
        content: "About Me updated successfully!",
      });
      onClose();
    } catch (err) {
      console.log("Error:", err);
      Toast.show({
        icon: "fail",
        content: err.message || "Failed to update About Me",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <DotLoading color="primary" />;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <>
      <Dialog
        visible={visible}
        title="About"
        content={
          <Form form={form} layout="vertical">
            <Form.Item
              name="aboutme"
              label="About Me"
              rules={[{ required: true, message: "Please enter About Me!" }]}
            >
              <Input placeholder="Enter About Me" />
            </Form.Item>
          </Form>
        }
        actions={[
          { 
            key: "cancel", 
            text: "Cancel", 
            onClick: onClose 
          },
          { 
            key: "submit", 
            text: submitting ? "Submitting..." : "Submit", 
            onClick: handleSubmit,
            disabled: submitting 
          },
        ]}
        onClose={onClose}
      />
      <div style={{ marginTop: 20 }}>
        <h3>User Profession Data</h3>
        <pre>{JSON.stringify(user.professionjson, null, 2)}</pre>
      </div>
    </>
  );
}

export default UserAbout;