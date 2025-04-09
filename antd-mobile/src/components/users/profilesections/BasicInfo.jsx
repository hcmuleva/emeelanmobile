import { Card, Image, Tag, Space, Divider } from 'antd-mobile'
import {
UserOutline,
  EnvironmentOutline,
  AppOutline, // For profession
  EditOutline // For bio
} from 'antd-mobile-icons'
const BasicInfoCard = ({ profile }) => (
  <Card
    title={
      <Space align='center'>
        <Image src={profile?.image} width={64} height={64} fit='cover' style={{ borderRadius: '50%' }} />
        <div>
          <h3>{profile.name}, {profile.age}</h3>
          <Tag color='primary'>{profile.profession}</Tag>
        </div>
      </Space>
    }
  >
    <Space direction='vertical' block>
      <Divider />
      <Space align='center'>
        <UserOutline />
        <span>{profile.gender} • {profile.religion}</span>
      </Space>
      
      <Space align='center'>
        <EnvironmentOutline />
        <span>{profile.city}, {profile.country}</span>
      </Space>
      
      <Space align='center'>
        <EnvironmentOutline />
        <span>{profile.company}</span>
      </Space>
      
      {profile.bio && (
        <>
          <Divider />
          <p style={{ color: 'var(--adm-color-text-secondary)' }}>{profile.bio}</p>
        </>
      )}
    </Space>
  </Card>
)
export default BasicInfoCard