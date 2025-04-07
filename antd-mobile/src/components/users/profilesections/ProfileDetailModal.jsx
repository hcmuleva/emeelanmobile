import { Modal, Tabs } from 'antd-mobile'
import BasicInfoCard from './BasicInfo'
import EducationCard from './Education'
import FamilyCard from './Family'
//import { BasicInfoCard, EducationCard, FamilyCard } from './components'
const  profile = {
    basic: {
      name: "Priya Sharma",
      age: 28,
      image: "https://example.com/photo.jpg",
      profession: "Software Engineer",
      gender: "Female",
      religion: "Hindu",
      city: "Bangalore",
      country: "India",
      company: "Tech Solutions Inc.",
      bio: "Looking for a life partner who values family and career balance."
    },
    education: [
      {
        degree: "MS Computer Science",
        institution: "IIT Delhi",
        year: "2018-2020"
      },
      {
        degree: "BTech",
        institution: "NIT Karnataka",
        year: "2014-2018"
      }
    ],
    family: {
      fatherName: "Rajesh Sharma",
      fatherOccupation: "Bank Manager",
      motherName: "Sunita Sharma",
      motherOccupation: "Teacher",
      siblings: "1 Brother",
      origin: "Punjabi"
    }
  }
const ProfileDetailModal = ({  onClose }) => (
  <Modal
    visible={true}
    title='Profile Details'
    onClose={onClose}
    bodyStyle={{ padding: 0 }}
    content={
      <Tabs stretch>
        <Tabs.Tab title='Basic' key='1basic'>
          <div style={{ padding: 12 }}>
            <BasicInfoCard profile={profile.basic} />
          </div>
        </Tabs.Tab>
        
        <Tabs.Tab title='Education' key='1education'>
          <div style={{ padding: 12 }}>
            <EducationCard education={profile.education} />
          </div>
        </Tabs.Tab>
        
        <Tabs.Tab title='Family' key='1family'>
          <div style={{ padding: 12 }}>
            <FamilyCard family={profile.family} />
          </div>
        </Tabs.Tab>
      </Tabs>
    }
  />
)

export default ProfileDetailModal