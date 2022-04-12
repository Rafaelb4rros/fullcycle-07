import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../../components/Button";
import { Card } from "../../../../../components/Card";
import { FormButtonActions } from "../../../../../components/FormButtonActions";
import { Input } from "../../../../../components/Input";
import { Layout } from "../../../../../components/layouts/Layout";
import { Select } from "../../../../../components/Select";
import { Title } from "../../../../../components/Title";
import { api } from "../../../../../lib/api";
import { Transaction } from "../../../../../shared/types";

function TransactionRegister() {
  const {
    push,
    back: pushBack,
    query: { id },
  } = useRouter();

  const { register, handleSubmit: onSubmit } = useForm();

  async function handleSubmit(data) {
    console.log(data);
    try {
      await api.post<Transaction>(`bank-accounts/${id}/transactions`, {
        ...data,
        amount: Number(data.amount),
      });
      toast.success("Transação realizada cadastrada com sucesso!");

      push({
        pathname: `/bank-accounts/[id]`,
        query: { id },
      });
    } catch (err) {
      toast.error("Ocorreu um erro durante a criação da chave transação!");
      console.error(err);
    }
  }

  return (
    <Layout>
      <Title>Realizar transação</Title>
      <Card>
        <form onSubmit={onSubmit(handleSubmit)}>
          <div className="row">
            <div className="col-sm-4">
              <Select
                labelText="Tipo da chave"
                name="pix_key_kind"
                id="pix_key_kind"
                {...register("pix_key_kind")}
              >
                <option value="cpf">CPF</option>
                <option value="email">E-MAIl</option>
              </Select>
            </div>

            <div className="col-sm-8">
              <Input
                id="pix_key_key"
                name="pix_key_key"
                type="text"
                labelText="Chave Pix"
                {...register("pix_key_key")}
              />
            </div>
          </div>
          <Input
            name="amount"
            id="amount"
            step=".01"
            type="number"
            labelText="Valor a transferir"
            {...register("amount")}
          />
          <Input
            name="description"
            id="description"
            type="text"
            labelText="Descrição"
            {...register("description")}
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
    </Layout>
  );
}

export default TransactionRegister;
