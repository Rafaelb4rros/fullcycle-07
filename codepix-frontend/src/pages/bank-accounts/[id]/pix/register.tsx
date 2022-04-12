import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { FormButtonActions } from "../../../../components/FormButtonActions";
import { Input } from "../../../../components/Input";
import { Layout } from "../../../../components/layouts/Layout";
import { PixKeyCard } from "../../../../components/PixKeyCard";
import { Title } from "../../../../components/Title";
import { api } from "../../../../lib/api";
import { PixKey } from "../../../../shared/types";
import styles from "./pix-register.module.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

interface PixRegisterProps {
  pixKeys: PixKey[];
}

function PixRegister({ pixKeys: pixKeysInitialState }: PixRegisterProps) {
  const [pixKeys, setPixKeys] = useState<PixKey[]>(pixKeysInitialState);

  const {
    back: pushBack,
    query: { id },
  } = useRouter();

  const { register, handleSubmit: onSubmit, reset } = useForm();

  async function handleSubmit(data) {
    try {
      const { data: pixKey } = await api.post<PixKey>(
        `bank-accounts/${id}/pix-keys`,
        data
      );
      toast.success("Chave pix cadastrada com sucesso!");
      setPixKeys((oldState) => [...oldState, pixKey]);
      reset();
    } catch (err) {
      toast.error("Ocorreu um erro durante a criação da chave pix!");
      console.error(err);
    }
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-sm-6">
          <Title>Cadastrar chave pix</Title>
          <Card>
            <form onSubmit={onSubmit(handleSubmit)}>
              <p className={styles.kindInfo}>Tipo</p>

              <Input
                type="radio"
                id="name"
                name="kind"
                labelText="CPF"
                value="cpf"
                {...register("kind")}
              />
              <Input
                type="radio"
                id="email"
                name="kind"
                labelText="E-MAIL"
                value="email"
                {...register("kind")}
              />

              <Input
                name="key"
                type="text"
                id="key"
                labelText="Digite a chave"
                {...register("key")}
              />

              <FormButtonActions>
                <Button onClick={pushBack} type="button" variant="info">
                  Voltar
                </Button>
                <Button type="submit" variant="primary">
                  Cadastrar
                </Button>
              </FormButtonActions>
            </form>
          </Card>
        </div>
        <div className="col-sm-4 offset-md-2">
          <Title>Minhas chaves pix</Title>
          {pixKeys.map((pixKey) => (
            <PixKeyCard key={pixKey.id} pixKey={pixKey} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default PixRegister;

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const { data: pixKeys } = await api.get(`bank-accounts/${id}/pix-keys`);

  return {
    props: {
      pixKeys,
    },
  };
};
