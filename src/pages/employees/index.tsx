import { PlusCircleOutlined } from "@ant-design/icons"
import { CustomButton } from "../../components/custom-button"
import { Layout } from "../../components/layout"
import { Table } from "antd"
import { useGetAllEmployeesQuery } from "../../app/services/employeesApi"
import { ColumnsType } from "antd/es/table"
import { Employee } from "../../app/types"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../paths"

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    },
  },
  {
    title: "Должность",
    dataIndex: "role",
    key: "role",
    sorter: (a, b) => {
      if (a.role < b.role) {
        return -1
      }
      if (a.role > b.role) {
        return 1
      }
      return 0
    },
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
]

export const Employees = () => {
  const navigate = useNavigate()
  const { isLoading, data } = useGetAllEmployeesQuery()

  const goToAddEmployee = () => navigate(Paths.employeeAdd)

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddEmployee}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={record => record.id}
        onRow={record => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          }
        }}
      />
    </Layout>
  )
}
