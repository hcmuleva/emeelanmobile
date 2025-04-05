import React, { useState } from 'react';
import { 
  FloatingPanel, 
  List, 
  Divider, 
  Image, 
  Tag,
  Button, 
  Space,
  Toast,
  Modal
} from 'antd-mobile';
import { 
  UserOutline, 
  TeamOutline, 
  EnvironmentOutline,
  
  BookOutline,
  TrophyOutline,
  HeartOutline
} from 'antd-mobile-icons';
const profile = {
    id: 123,
    firstName: "Harish",
    lastName: "Muleva",
    age: 43,
    location: "Bangalore, India",
    profileImage: "https://example.com/profile.jpg",
    json: {
      "family": [
        {
          "age": "104",
          "type": "Parent",
          "lastName": "Keshaji Muleva",
          "location": "Siwai, Barwani dist MP",
          "firstName": "Shri Bhikaji",
          "profession": "Farmer",
          "businessDetail": "100 acr agriculture land. Tobbacco business"
        },
        {
          "age": "75",
          "type": "Sibling",
          "lastName": "Bhikaji",
          "location": "Siwai",
          "firstName": "Mr Bhagwan",
          "profession": "Farmer",
          "maritalStatus": "Married",
          "businessDetail": "Agriculture"
        }
      ],
      "aboutMe": {
        "caste": "Seervi",
        "height": "5'11''",
        "weight": "80",
        "aboutMe": "Results-driven Senior Architect with over two decades of expertise in software\ndevelopment, testing, and architectural leadership. Proven track record in\ndesigning and implementing innovative solutions to address complex business\nchallenges. Adept at leading DevOps initiatives, automating infrastructure, and\noptimizing testing processes.",
        "hobbies": "Social Activity\nPlaying Cricket",
        "subcaste": "Muleva",
        "isMonglik": "DontKnow",
        "birthplace": "Indore",
        "bloodGroup": "B+",
        "complexion": "Fair",
        "disability": "None",
        "othertongue": "Hindi",
        "timeofbirth": "5:30AM",
        "achievements": "1) Owner of two software company\n2) Worked for 9 Top companies\n3) KMS initiative\n4) more than 100 got job in software companies",
        "disabilitydesc": "NA"
      },
      "mychoice": {
        "preference": "1) Accept Joint family.\n2) Natural life style.",
        "must_choice": "Looking behalf working in Software field or education field"
      },
      "profession": [
        {
          "type": "Student",
          "institute": "IIT Delhi",
          "percentage": "7.5",
          "passingYear": "2000",
          "educationType": "postgraduate",
          "educationDescription": "Communication & Radar"
        },
        {
          "type": "Service",
          "salary": "1,75,00,000",
          "designation": "Sr. Director",
          "organization": "Dell India",
          "serviceDescription": "Managing 3 geo teams"
        }
      ]
    }
  };
export const ProfileDetailPanel = ({ visible, onClose }) => {
    console.log(profile, "Profile")

    const safeProfile = {
        ...profile,
        json: {
          family: profile.json?.family || [],
          aboutMe: profile.json?.aboutMe || {},
          mychoice: profile.json?.mychoice || {},
          profession: profile.json?.profession || [],
          ...profile.json
        }
      };
     console.log("safeProfile", safeProfile)
      // If profile is empty, show error and close
      if (!profile || !profile.json) {
        console.log("Erorr in complete data")
        // Toastshow('Profile data is incomplete');
        onClose();
        return null;
      }
    
      return (
        <Modal
        visible={visible}
        content={
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '16px',
              position: 'sticky',
              top: 0,
              background: 'white',
              zIndex: 1,
              borderBottom: '1px solid #f0f0f0'
            }}>
              <Image
                src={safeProfile.profileImage || 'https://via.placeholder.com/60'}
                width={60}
                height={60}
                style={{ 
                  borderRadius: '30px', 
                  marginRight: '12px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontSize: '18px' }}>
                  {safeProfile.firstName || 'No name'} {safeProfile.lastName || ''}
                </h2>
                <div style={{ color: '#666', fontSize: '13px' }}>
                  {safeProfile.age ? `${safeProfile.age} yrs` : ''} • {safeProfile.location || ''}
                </div>
              </div>
              <Button 
                fill='none'
                onClick={onClose}
                style={{ '--padding-vertical': '4px' }}
              >
                <UserOutline fontSize={20} />
              </Button>
            </div>
  
            {/* Content - Scrollable */}
            <div style={{ padding: '0 16px 16px' }}>
              {/* Family Section */}
              {safeProfile.json.family.length > 0 && (
                <>
                  <Divider contentPosition="left">
                    <Space align="center">
                      <TeamOutline />
                      <span style={{ fontWeight: '500' }}>Family</span>
                    </Space>
                  </Divider>
                  <List>
                    {safeProfile.json.family.map((member, index) => (
                      <List.Item
                        key={index}
                        description={
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            {member.type && <div>{member.type} • {member.age || ''} yrs</div>}
                            {member.profession && <div>{member.profession}</div>}
                            {member.businessDetail && <div>{member.businessDetail}</div>}
                            {member.location && <div>{member.location}</div>}
                          </div>
                        }
                      >
                        <span style={{ fontWeight: '500', fontSize: '14px' }}>
                          {member.firstName || ''} {member.lastName || ''}
                        </span>
                      </List.Item>
                    ))}
                  </List>
                </>
              )}
  
              {/* About Me Section */}
              <Divider contentPosition="left">
                <Space align="center">
                  <UserOutline />
                  <span style={{ fontWeight: '500' }}>About</span>
                </Space>
              </Divider>
              <List>
                {Object.entries({
                  'Height': safeProfile.json.aboutMe.height,
                  'Weight': safeProfile.json.aboutMe.weight,
                  'Caste': safeProfile.json.aboutMe.caste,
                  'Subcaste': safeProfile.json.aboutMe.subcaste,
                  'Complexion': safeProfile.json.aboutMe.complexion,
                  'Blood Group': safeProfile.json.aboutMe.bloodGroup
                }).map(([label, value]) => (
                  value && (
                    <List.Item key={label} extra={value}>
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>{label}</span>
                    </List.Item>
                  )
                ))}
  
                {safeProfile.json.aboutMe.aboutMe && (
                  <List.Item>
                    <div style={{ fontWeight: '500', marginBottom: '6px', fontSize: '14px' }}>About Me</div>
                    <div style={{ whiteSpace: 'pre-line', color: '#666', fontSize: '13px' }}>
                      {safeProfile.json.aboutMe.aboutMe}
                    </div>
                  </List.Item>
                )}
              </List>
  
              {/* Profession Section */}
              {safeProfile.json.profession.length > 0 && (
                <>
                  <Divider contentPosition="left">
                    <Space align="center">
                      <UserOutline />
                      <span style={{ fontWeight: '500' }}>Profession</span>
                    </Space>
                  </Divider>
                  <List>
                    {safeProfile.json.profession.map((job, index) => (
                      <List.Item
                        key={index}
                        description={
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            <div>{job.organization || job.institute || 'Unknown'}</div>
                            {job.designation && <div>{job.designation}</div>}
                            {job.salary && <div>Salary: {job.salary}</div>}
                            {job.passingYear && <div>Year: {job.passingYear}</div>}
                            {(job.serviceDescription || job.educationDescription) && (
                              <div style={{ whiteSpace: 'pre-line', marginTop: '4px' }}>
                                {job.serviceDescription || job.educationDescription}
                              </div>
                            )}
                          </div>
                        }
                      >
                        <span style={{ fontWeight: '500', fontSize: '14px' }}>
                          {job.type === 'Student' ? 'Education' : 'Career'}
                        </span>
                      </List.Item>
                    ))}
                  </List>
                </>
              )}
  
              {/* Preferences Section */}
              {(safeProfile.json.mychoice.preference || safeProfile.json.mychoice.must_choice) && (
                <>
                  <Divider contentPosition="left">
                    <Space align="center">
                      <HeartOutline />
                      <span style={{ fontWeight: '500' }}>Preferences</span>
                    </Space>
                  </Divider>
                  <List>
                    {safeProfile.json.mychoice.preference && (
                      <List.Item>
                        <div style={{ fontWeight: '500', marginBottom: '6px', fontSize: '14px' }}>Preferences</div>
                        <div style={{ whiteSpace: 'pre-line', color: '#666', fontSize: '13px' }}>
                          {safeProfile.json.mychoice.preference}
                        </div>
                      </List.Item>
                    )}
                    {safeProfile.json.mychoice.must_choice && (
                      <List.Item>
                        <div style={{ fontWeight: '500', marginBottom: '6px', fontSize: '14px' }}>Must Have</div>
                        <div style={{ whiteSpace: 'pre-line', color: '#666', fontSize: '13px' }}>
                          {safeProfile.json.mychoice.must_choice}
                        </div>
                      </List.Item>
                    )}
                  </List>
                </>
              )}
            </div>
  
            {/* Fixed Footer Button */}
            <div style={{
              position: 'sticky',
              bottom: 0,
              background: 'white',
              padding: '12px 16px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <Button 
                block 
                color='primary' 
                size='large'
                style={{ '--border-radius': '8px' }}
              >
                Connect with {safeProfile.firstName || 'User'}
              </Button>
            </div>
          </div>
        }
        closeOnMaskClick
        onClose={onClose}
        bodyStyle={{
          padding: 0,
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    );
  };
    