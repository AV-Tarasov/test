import { Row } from "antd"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { EmployeeForm } from "../../components/employee-form"
import { Layout } from "../../components/layout"
import { Paths } from "../../paths"
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employeesApi"
import { Employee } from "../../app/types"

export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState("")
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return <span>Загрузка</span>
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }

      await editEmployee(editedEmployee).unwrap()

      navigate(`${Paths.status}/created`)
    } catch (err) {}
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleEditUser}
          title="Редактировать сотрудника"
          employee={data}
          btnText="Редактировать"
          error={error}
        />
      </Row>
    </Layout>
  )
}
