"use client";
import React, { useMemo } from "react";
import { Inter } from "next/font/google";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { map } from "lodash";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";
import { ROUTES } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname();

  const renderMenuItems: MenuProps["items"] = useMemo(
    () =>
      map(ROUTES, ({ name, path, icon }) => {
        return {
          key: path,
          label: <Link href={path}>{name}</Link>,
          icon: React.createElement(icon),
        };
      }),
    []
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Layout style={{ height: "100vh" }}>
            <Layout>
              <Sider
                width={200}
                style={{ background: colorBgContainer }}
                theme="dark"
              >
                <Menu
                  mode="inline"
                  theme="dark"
                  defaultSelectedKeys={[pathname ?? "/"]}
                  style={{ height: "100%", borderRight: 0 }}
                  items={renderMenuItems}
                />
              </Sider>
              <Layout style={{ padding: 24 }}>
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    overflow: 'auto',
                    borderRadius: 12
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
