import { BankAccountCard } from "../components/BankAccountCard";
import { Layout } from "../components/layouts/Layout";
import { Title } from "../components/Title";

function BankAccountList() {
  return (
    <Layout>
      <Title>contas bancarioas</Title>
      <div className="row">
        <a href="#" className="col-12 col-sm-6 col-md4">
          <BankAccountCard
            bankAccount={{
              id: "algo",
              owner_name: "Rafael Barros",
              account_number: "1111",
              balance: 10000,
            }}
          />
        </a>
        <a href="#" className="col-12 col-sm-6 col-md4">
          <BankAccountCard
            bankAccount={{
              id: "algo",
              owner_name: "Rafael Barros",
              account_number: "1111",
              balance: 10000,
            }}
          />
        </a>
        <a href="#" className="col-12 col-sm-6 col-md4">
          <BankAccountCard
            bankAccount={{
              id: "algo",
              owner_name: "Rafael Barros",
              account_number: "1111",
              balance: 10000,
            }}
          />
        </a>
        <a href="#" className="col-12 col-sm-6 col-md4">
          <BankAccountCard
            bankAccount={{
              id: "algo",
              owner_name: "Rafael Barros",
              account_number: "1111",
              balance: 10000,
            }}
          />
        </a>
      </div>
    </Layout>
  );
}

export default BankAccountList;
