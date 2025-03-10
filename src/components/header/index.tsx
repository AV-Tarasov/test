import { Layout, Space, Typography } from "antd"
import styles from "./index.module.scss"
import { TeamOutlined } from "@ant-design/icons"
import { CustomButton } from "../custom-button"
import { Link } from "react-router-dom"
import { Paths } from "../../paths"

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space className={styles.title}>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  )
}
