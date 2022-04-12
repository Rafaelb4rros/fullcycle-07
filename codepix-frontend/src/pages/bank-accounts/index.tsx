import { GetServerSideProps } from "next";
import Link from "next/link";
import { BankAccountCard } from "../../components/BankAccountCard";
import { Layout } from "../../components/layouts/Layout";
import { Title } from "../../components/Title";
import { api } from "../../lib/api";
import { BankAccount } from "../../shared/types";

interface BankAccountListProps {
  bankAccounts: BankAccount[];
}

function BankAccountList({ bankAccounts }: BankAccountListProps) {
  return (
    <Layout>
      <Title>Accounts</Title>
      <div className="row">
        {bankAccounts.map((bankAccount) => (
          <Link key={bankAccount.id} href={`/bank-accounts/${bankAccount.id}`}>
            <a className="col-12 col-sm-6 col-md4">
              <BankAccountCard bankAccount={bankAccount} />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default BankAccountList;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: bankAccounts } = await api.get<BankAccount[]>("bank-accounts");

  return {
    props: {
      bankAccounts,
    },
  };
};
