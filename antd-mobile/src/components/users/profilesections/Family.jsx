import { Card, List,Space } from 'antd-mobile'
import { TeamOutline,  BankcardOutline } from 'antd-mobile-icons'

const FamilyCard = ({ family }) => (
  <Card title={
    <Space align='center'>
      <TeamOutline />
      <span>Family Details</span>
    </Space>
  }>
    <List>
      <List.Item prefix={<BankcardOutline />}>
        <Space justify='between' block>
          <span>Father</span>
          <Space align='center'>
            <BankcardOutline />
            <span>{family.fatherOccupation}</span>
          </Space>
        </Space>
      </List.Item>
      {/* Similar for other family members */}
    </List>
  </Card>
)
export default FamilyCard