import { Button, Card, Form, Switch, Toast } from 'antd-mobile';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';
import { getCustomMe, updateUser } from '../../../../services/api';

export default function Preferences() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [initialPreferences, setInitialPreferences] = useState({
    hidePhoneNumber: false,
    hidePhotos: false,
    hideLocation: false,
    notifications: false,
    language: '',
    theme: ''
  });

  // Fetch user data and initialize form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const userdata = await getCustomMe(jwt);

        console.log("User settings:", userdata?.settingjson);

        if (userdata?.settingjson?.prerence) {
          const pref = userdata.settingjson.prerence;

          // Set initial preferences from API
          setInitialPreferences({
            hidePhoneNumber: pref.hidePhoneNumber || false,
            hidePhotos: pref.hidePhotos || false,
            hideLocation: pref.hideLocation || false,
            notifications: pref.notifications || false,
            language: pref.language || '',
            theme: pref.theme || ''
          });

          // Initialize form values
          form.setFieldsValue({
            notifications: pref.notifications || false,
            language: pref.language || '',
            theme: pref.theme || ''
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Toast.show({
          content: 'Failed to load preferences',
          position: 'bottom'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  const handleToggleChange = (key, checked) => {
    setInitialPreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSubmit = async () => {
    try {
      const formValues = form.getFieldsValue();
      const allValues = {
        ...initialPreferences,
        ...formValues
      };

      console.log('Submitted Preferences:', allValues);
      const userObj = JSON.parse(localStorage.getItem("user"));
      const settingjson = { "prerence": allValues };
      const updatedresponse = await updateUser({ settingjson: settingjson }, localStorage.getItem("jwt"), userObj?.id);
      // Here you would typically call an API to save preferences
      // await savePreferences(allValues);
      console.log("updated res", updatedresponse)
      Toast.show({
        content: 'Preferences saved successfully',
        position: 'bottom'
      });
    } catch (error) {
      console.error("Failed to save preferences:", error);
      Toast.show({
        content: 'Failed to save preferences',
        position: 'bottom'
      });
    }
  };

  if (loading) {
    return <div>Loading preferences...</div>;
  }

  return (
    <div>
      <Card className="settings-card">
        <div className="preference-item">
          <span>Hide Phone Number</span>
          <Switch
            checkedText={<CheckOutline fontSize={18} />}
            uncheckedText={<CloseOutline fontSize={18} />}
            checked={initialPreferences.hidePhoneNumber}
            onChange={(checked) => handleToggleChange("hidePhoneNumber", checked)}
          />
        </div>

        <div className="preference-item">
          <span>Hide Photos</span>
          <Switch
            checkedText={<CheckOutline fontSize={18} />}
            uncheckedText={<CloseOutline fontSize={18} />}
            checked={initialPreferences.hidePhotos}
            onChange={(checked) => handleToggleChange("hidePhotos", checked)}
          />
        </div>

        <div className="preference-item">
          <span>Hide Location</span>
          <Switch
            checkedText={<CheckOutline fontSize={18} />}
            uncheckedText={<CloseOutline fontSize={18} />}
            checked={initialPreferences.hideLocation}
            onChange={(checked) => handleToggleChange("hideLocation", checked)}
          />
        </div>

        <Form
          form={form}
          className="original-settings"
          initialValues={{
            notifications: initialPreferences.notifications,
            language: initialPreferences.language,
            theme: initialPreferences.theme
          }}
        >
          <Form.Item
            name="notifications"
            label="Notifications"
            valuePropName="checked"
          >
            <Switch
              checkedText={<CheckOutline fontSize={18} />}
              uncheckedText={<CloseOutline fontSize={18} />}
            />
          </Form.Item>
          {/* <Form.Item name="language" label="Language">
            <Input placeholder="Select language" />
          </Form.Item>
          <Form.Item name="theme" label="Theme">
            <Input placeholder="Select theme" />
          </Form.Item> */}

          <Form.Item>
            <Button
              block
              color="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
            >
              Save Preferences
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}