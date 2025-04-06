import React, { useState } from 'react';
import {
  List,
  Divider,
  Image,
  Button,
  Space,
  Card,
  Grid,
  NavBar,
  Input,
  TextArea,
  Form,
  Toast
} from 'antd-mobile';
import {
  UserOutline,
  TeamOutline,
  HeartOutline,
  EnvironmentOutline,
  PhoneOutline,
  GlobalOutline,
  LeftOutline,
  EditSOutline,
  CheckOutline,
  CloseOutline
} from 'antd-mobile-icons';
import '../../styles/userdetail.css';

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

export const ProfileDetailPanel = () => {
  // Initialize state with profile data
  const [profileData, setProfileData] = useState({
    ...profile,
    json: {
      family: profile.json?.family || [],
      aboutMe: profile.json?.aboutMe || {},
      mychoice: profile.json?.mychoice || {},
      profession: profile.json?.profession || [],
      ...profile.json
    }
  });

  // Edit mode state for each section
  const [editModes, setEditModes] = useState({
    personal: false,
    professional: false,
    family: false,
    preferences: false
  });

  // Temporary storage for edits
  const [tempData, setTempData] = useState({});

  // Enable edit mode for a section
  const enableEdit = (section) => {
    setTempData({
      ...tempData,
      [section]: JSON.parse(JSON.stringify(
        section === 'personal' ? profileData.json.aboutMe :
        section === 'professional' ? profileData.json.profession :
        section === 'family' ? profileData.json.family :
        profileData.json.mychoice
      ))
    });
    setEditModes({ ...editModes, [section]: true });
  };

  // Save edits for a section
  const saveChanges = (section) => {
    const newProfileData = { ...profileData };
    
    if (section === 'personal') {
      newProfileData.json.aboutMe = tempData[section];
    } else if (section === 'professional') {
      newProfileData.json.profession = tempData[section];
    } else if (section === 'family') {
      newProfileData.json.family = tempData[section];
    } else if (section === 'preferences') {
      newProfileData.json.mychoice = tempData[section];
    }
    
    setProfileData(newProfileData);
    setEditModes({ ...editModes, [section]: false });
    Toast.show({
      content: 'Changes saved successfully',
      position: 'bottom',
    });
  };

  // Cancel edits for a section
  const cancelChanges = (section) => {
    setEditModes({ ...editModes, [section]: false });
  };

  // Handle field changes in temp data
  const handleChange = (section, field, value, index = null) => {
    const updatedTempData = { ...tempData };
    
    if (index !== null) {
      // For array fields like family or profession
      updatedTempData[section][index][field] = value;
    } else {
      // For object fields like aboutMe or mychoice
      updatedTempData[section][field] = value;
    }
    
    setTempData(updatedTempData);
  };

  return (
    <div className="container">
      {/* Back Navigation */}
      <NavBar 
        className="nav-bar"
        backArrow={<LeftOutline className="back-icon" />}
        onBack={() => Toast.show('Back clicked')}
      >
        <span className="nav-title">Profile Details</span>
      </NavBar>

      {/* Header with Profile Summary */}
      <div className="header">
        <div className="profile-info">
          <Image
            src={profileData.profileImage || 'https://via.placeholder.com/80'}
            width={80}
            height={80}
            className="profile-image"
            fit="cover"
          />
          <div className="profile-text">
            <h2 className="user-name">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <div className="user-meta">
              <EnvironmentOutline /> {profileData.location} • {profileData.age} yrs
            </div>
            <div style={{ marginTop: '8px' }}>
              {profileData.json.profession[1]?.designation && (
                <div className="job-designation">
                  {profileData.json.profession[1].designation} at {profileData.json.profession[1].organization}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="card">
        <div className="card-head">
          <div className="section-title">
            <UserOutline /> Personal Details
          </div>
          {!editModes.personal ? (
            <div onClick={() => enableEdit('personal')} className="clickable">
              <EditSOutline className="edit-icon" />
            </div>
          ) : null}
        </div>
        <div className="card-body">
          {!editModes.personal ? (
            <>
              <div className="info-grid">
                {[
                  ['Height', profileData.json.aboutMe.height],
                  ['Weight', profileData.json.aboutMe.weight + ' kg'],
                  ['Caste', profileData.json.aboutMe.caste],
                  ['Subcaste', profileData.json.aboutMe.subcaste],
                  ['Blood Group', profileData.json.aboutMe.bloodGroup],
                  ['Complexion', profileData.json.aboutMe.complexion],
                  ['Mother Tongue', profileData.json.aboutMe.othertongue],
                  ['Birth Place', profileData.json.aboutMe.birthplace]
                ].map(([label, value]) => value && (
                  <div key={label} className="info-item">
                    <span className="info-label">{label}</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>
              
              {profileData.json.aboutMe.aboutMe && (
                <>
                  <div className="section-subheading">About Me</div>
                  <div className="about-text">
                    {profileData.json.aboutMe.aboutMe}
                  </div>
                </>
              )}
            </>
          ) : (
            // Edit mode for personal details
            <Form layout='horizontal'>
              <div className="info-grid">
                {[
                  ['height', 'Height'],
                  ['weight', 'Weight (kg)'],
                  ['caste', 'Caste'],
                  ['subcaste', 'Subcaste'],
                  ['bloodGroup', 'Blood Group'],
                  ['complexion', 'Complexion'],
                  ['othertongue', 'Mother Tongue'],
                  ['birthplace', 'Birth Place']
                ].map(([field, label]) => (
                  <div key={field}>
                    <div className="form-label">{label}</div>
                    <Input
                      className="input"
                      value={tempData.personal[field] || ''}
                      onChange={(val) => handleChange('personal', field, val)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="form-label">About Me</div>
              <TextArea
                className="textarea"
                value={tempData.personal.aboutMe || ''}
                onChange={(val) => handleChange('personal', 'aboutMe', val)}
                rows={4}
              />
              
              <div className="edit-buttons">
                <Button 
                  className="cancel-button"
                  onClick={() => cancelChanges('personal')}
                >
                  <CloseOutline /> Cancel
                </Button>
                <Button 
                  className="save-button"
                  onClick={() => saveChanges('personal')}
                >
                  <CheckOutline /> Save
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>

      {/* Professional Background */}
      {profileData.json.profession.length > 0 && (
        <div className="card">
          <div className="card-head">
            <div className="section-title">
              <GlobalOutline /> Professional Background
            </div>
            {!editModes.professional ? (
              <div onClick={() => enableEdit('professional')} className="clickable">
                <EditSOutline className="edit-icon" />
              </div>
            ) : null}
          </div>
          <div className="card-body">
            {!editModes.professional ? (
              // View mode
              <>
                {profileData.json.profession.map((job, index) => (
                  <div key={index} style={{ marginBottom: index < profileData.json.profession.length - 1 ? '16px' : 0 }}>
                    <div className="section-heading">
                      {job.type === 'Student' ? 'Education' : 'Career'}
                    </div>
                    <div className="job-title">
                      {job.organization || job.institute}
                    </div>
                    <div className="job-details">
                      {job.designation && <div>{job.designation}</div>}
                      {job.salary && <div>Salary: {job.salary}</div>}
                      {job.educationType && <div>{job.educationType}</div>}
                      {job.passingYear && <div>Year: {job.passingYear}</div>}
                      {(job.serviceDescription || job.educationDescription) && (
                        <div style={{ marginTop: '4px' }}>
                          {job.serviceDescription || job.educationDescription}
                        </div>
                      )}
                    </div>
                    {index < profileData.json.profession.length - 1 && (
                      <Divider style={{ margin: '12px 0', borderColor: 'var(--divider)' }} />
                    )}
                  </div>
                ))}
              </>
            ) : (
              // Edit mode for professional details
              <Form layout='horizontal'>
                {tempData.professional.map((job, index) => (
                  <div key={index}>
                    <div className="form-label">Type</div>
                    <Input
                      className="input"
                      value={job.type || ''}
                      onChange={(val) => handleChange('professional', 'type', val, index)}
                    />
                    
                    <div className="form-label">
                      {job.type === 'Student' ? 'Institute' : 'Organization'}
                    </div>
                    <Input
                      className="input"
                      value={job.organization || job.institute || ''}
                      onChange={(val) => handleChange('professional', job.type === 'Student' ? 'institute' : 'organization', val, index)}
                    />
                    
                    {job.type === 'Student' ? (
                      <>
                        <div className="form-label">Education Type</div>
                        <Input
                          className="input"
                          value={job.educationType || ''}
                          onChange={(val) => handleChange('professional', 'educationType', val, index)}
                        />
                        
                        <div className="form-label">Passing Year</div>
                        <Input
                          className="input"
                          value={job.passingYear || ''}
                          onChange={(val) => handleChange('professional', 'passingYear', val, index)}
                        />
                        
                        <div className="form-label">Description</div>
                        <TextArea
                          className="textarea"
                          value={job.educationDescription || ''}
                          onChange={(val) => handleChange('professional', 'educationDescription', val, index)}
                          rows={3}
                        />
                      </>
                    ) : (
                      <>
                        <div className="form-label">Designation</div>
                        <Input
                          className="input"
                          value={job.designation || ''}
                          onChange={(val) => handleChange('professional', 'designation', val, index)}
                        />
                        
                        <div className="form-label">Salary</div>
                        <Input
                          className="input"
                          value={job.salary || ''}
                          onChange={(val) => handleChange('professional', 'salary', val, index)}
                        />
                        
                        <div className="form-label">Description</div>
                        <TextArea
                          className="textarea"
                          value={job.serviceDescription || ''}
                          onChange={(val) => handleChange('professional', 'serviceDescription', val, index)}
                          rows={3}
                        />
                      </>
                    )}
                    
                    {index < tempData.professional.length - 1 && (
                      <Divider style={{ margin: '16px 0', borderColor: 'var(--divider)' }} />
                    )}
                  </div>
                ))}
                
                <div className="edit-buttons">
                  <Button 
                    className="cancel-button"
                    onClick={() => cancelChanges('professional')}
                  >
                    <CloseOutline /> Cancel
                  </Button>
                  <Button 
                    className="save-button"
                    onClick={() => saveChanges('professional')}
                  >
                    <CheckOutline /> Save
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </div>
      )}

      {/* Family Section */}
      {profileData.json.family.length > 0 && (
        <div className="card">
          <div className="card-head">
            <div className="section-title">
              <TeamOutline /> Family Background
            </div>
            {!editModes.family ? (
              <div onClick={() => enableEdit('family')} className="clickable">
                <EditSOutline className="edit-icon" />
              </div>
            ) : null}
          </div>
          <div className="card-body">
            {!editModes.family ? (
              // View mode
              <>
                {profileData.json.family.map((member, index) => (
                  <div key={index} className="family-member">
                    <div className="family-name">
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="family-details">
                      <div>{member.type} • {member.age} years</div>
                      <div>{member.profession}</div>
                      <div>{member.businessDetail}</div>
                      <div>{member.location}</div>
                    </div>
                    {index < profileData.json.family.length - 1 && (
                      <Divider style={{ margin: '12px 0', borderColor: 'var(--divider)' }} />
                    )}
                  </div>
                ))}
              </>
            ) : (
              // Edit mode for family details
              <Form layout='horizontal'>
                {tempData.family.map((member, index) => (
                  <div key={index}>
                    <div className="form-row">
                      <div className="form-col">
                        <div className="form-label">First Name</div>
                        <Input
                          className="input"
                          value={member.firstName || ''}
                          onChange={(val) => handleChange('family', 'firstName', val, index)}
                        />
                      </div>
                      <div className="form-col">
                        <div className="form-label">Last Name</div>
                        <Input
                          className="input"
                          value={member.lastName || ''}
                          onChange={(val) => handleChange('family', 'lastName', val, index)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-col">
                        <div className="form-label">Relation Type</div>
                        <Input
                          className="input"
                          value={member.type || ''}
                          onChange={(val) => handleChange('family', 'type', val, index)}
                        />
                      </div>
                      <div className="form-col">
                        <div className="form-label">Age</div>
                        <Input
                          className="input"
                          value={member.age || ''}
                          onChange={(val) => handleChange('family', 'age', val, index)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-label">Profession</div>
                    <Input
                      className="input"
                      value={member.profession || ''}
                      onChange={(val) => handleChange('family', 'profession', val, index)}
                    />
                    
                    <div className="form-label">Business Details</div>
                    <Input
                      className="input"
                      value={member.businessDetail || ''}
                      onChange={(val) => handleChange('family', 'businessDetail', val, index)}
                    />
                    
                    <div className="form-label">Location</div>
                    <Input
                      className="input"
                      value={member.location || ''}
                      onChange={(val) => handleChange('family', 'location', val, index)}
                    />
                    
                    {index < tempData.family.length - 1 && (
                      <Divider style={{ margin: '16px 0', borderColor: 'var(--divider)' }} />
                    )}
                  </div>
                ))}
                
                <div className="edit-buttons">
                  <Button 
                    className="cancel-button"
                    onClick={() => cancelChanges('family')}
                  >
                    <CloseOutline /> Cancel
                  </Button>
                  <Button 
                    className="save-button"
                    onClick={() => saveChanges('family')}
                  >
                    <CheckOutline /> Save
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </div>
      )}

      {/* Preferences Section */}
      {(profileData.json.mychoice.preference || profileData.json.mychoice.must_choice) && (
        <div className="card">
          <div className="card-head">
            <div className="section-title">
              <HeartOutline /> Partner Preferences
            </div>
            {!editModes.preferences ? (
              <div onClick={() => enableEdit('preferences')} className="clickable">
                <EditSOutline className="edit-icon" />
              </div>
            ) : null}
          </div>
          <div className="card-body">
            {!editModes.preferences ? (
              // View mode
              <>
                {profileData.json.mychoice.preference && (
                  <div style={{ marginBottom: '12px' }}>
                    <div className="section-heading">Preferences</div>
                    <div className="about-text">
                      {profileData.json.mychoice.preference}
                    </div>
                  </div>
                )}
                {profileData.json.mychoice.must_choice && (
                  <div>
                    <div className="section-heading">Must Have</div>
                    <div className="about-text">
                      {profileData.json.mychoice.must_choice}
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Edit mode for preferences
              <Form layout='horizontal'>
                <div className="form-label">Preferences</div>
                <TextArea
                  className="textarea"
                  value={tempData.preferences.preference || ''}
                  onChange={(val) => handleChange('preferences', 'preference', val)}
                  rows={4}
                />
                
                <div className="form-label">Must Have</div>
                <TextArea
                  className="textarea"
                  value={tempData.preferences.must_choice || ''}
                  onChange={(val) => handleChange('preferences', 'must_choice', val)}
                  rows={4}
                />
                
                <div className="edit-buttons">
                  <Button 
                    className="cancel-button"
                    onClick={() => cancelChanges('preferences')}
                  >
                    <CloseOutline /> Cancel
                  </Button>
                  <Button 
                    className="save-button"
                    onClick={() => saveChanges('preferences')}
                  >
                    <CheckOutline /> Save
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </div>
      )}

      {/* Connect Button */}
      <Button className="connect-button">
        Connect with {profileData.firstName}
      </Button>
    </div>
  );
};

