import { Row } from "antd"
import { Layout } from "../../components/layout"
import { EmployeeForm } from "../../components/employee-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddEmployeeMutation } from "../../app/services/employeesApi"
import { Employee } from "../../app/types"
import { Paths } from "../../paths"

export const AddEmployee = () => {
  const [error, setError] = useState()
  const navigate = useNavigate()
  const [AddEmployee] = useAddEmployeeMutation()

  const handleAddEmployee = async (data: Employee) => {
    try {
      await AddEmployee(data).unwrap

      navigate(`${Paths.status}/created`)
    } catch (error) {}
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
