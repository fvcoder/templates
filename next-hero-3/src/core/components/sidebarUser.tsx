"use client";

import { Avatar, Button, Dropdown, Label } from "@heroui/react";

const userData = {
  name: "Usuario Demo",
  email: "usuario@demo.com",
  avatar: "https://i.pravatar.cc/150?u=demo",
};

export function SidebarUser() {
  return (
    <div className="p-4">
      <Dropdown>
        <Button variant="ghost" className="h-auto w-full justify-start px-3 py-2">
          <Avatar size="sm">
            <Avatar.Image src={userData.avatar} />
            <Avatar.Fallback>{userData.name[0]}</Avatar.Fallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-foreground text-sm font-semibold">{userData.name}</p>
          </div>
        </Button>
        <Dropdown.Popover placement="top left">
          <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
            <Dropdown.Item id="logout" textValue="Cerrar Sesión" variant="danger">
              <Label>Cerrar Sesión</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
