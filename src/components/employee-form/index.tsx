import { Card, Cascader, Form, Space } from "antd"
import { Employee } from "../../app/types"
import { CustomInput } from "../custom-input"
import { ErrorMessage } from "../error-message"
import { CustomButton } from "../custom-button"

type Props<T> = {
  onFinish: (value: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}

const roles = [
  {
    value: "cook",
    label: "Повар",
  },
  {
    value: "waiter",
    label: "Официант",
  },
  {
    value: "driver",
    label: "Водитель",
  },
]

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="name" placeholder="Имя" />
        <Form.Item name="role" label="Должность">
          <Cascader options={roles} />
        </Form.Item>
        <CustomInput type="text" name="phone" placeholder="Телефон" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  )
}
