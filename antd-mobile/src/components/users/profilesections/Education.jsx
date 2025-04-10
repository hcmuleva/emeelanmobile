import { Card, List, Space } from 'antd-mobile'
import { TravelOutline, ClockCircleOutline } from 'antd-mobile-icons'

const EducationCard = ({ education }) => (
  <Card title='Education'>
    <List>
      {education.map((edu, index) => (
        <List.Item
          key={index}
          prefix={<TravelOutline />}
          description={
            <Space align='center'>
              <ClockCircleOutline />
              {edu.year}
            </Space>
          }
        >
          {edu.institution}
        </List.Item>
      ))}
    </List>
  </Card>
)
export default EducationCard