"use client";

import { Button, Card, Form, Input, Label, Spinner, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { loginAction } from "../actions/login.action";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await loginAction(data as any);

    if (typeof res === "string") {
      router.push("/");
      setIsLoading(false);

      return;
    }

    alert("Correo electrónico o contraseña incorrectos");
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full md:max-w-sm">
        <Card.Header>
          <Card.Title>Iniciar Sesión</Card.Title>
          <Card.Description>Ingresa tus credenciales para acceder a tu cuenta</Card.Description>
        </Card.Header>
        <Form onSubmit={onSubmit}>
          <Card.Content>
            <div className="flex flex-col gap-4">
              <TextField name="email" type="email" isRequired>
                <Label>Correo Electrónico</Label>
                <Input placeholder="tu@email.com" />
              </TextField>
              <TextField name="password" type="password" isRequired>
                <Label>Contraseña</Label>
                <Input placeholder="" />
              </TextField>
            </div>
          </Card.Content>
          <Card.Footer className="mt-4 flex flex-col gap-2">
            <Button className="w-full" type="submit" variant="primary" isPending={isLoading}>
              {isLoading ? <Spinner color="current" size="sm" /> : "Iniciar Sesión"}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}
