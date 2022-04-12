import { GetServerSideProps } from "next";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";
import { BankAccountBalance } from "../../../components/BankAccountBalance";
import { Layout } from "../../../components/layouts/Layout";
import { useBankContext } from "../../../contexts/BankContext";
import { api } from "../../../lib/api";
import { BankAccount, Transaction } from "../../../shared/types";
import styles from "./bank-account-dashboard.module.scss";

interface BankAccountDashboardProps {
  bankAccount: BankAccount;
  transactions: Transaction[];
}

interface ActionLinkProps extends LinkProps {}

function ActionLink({ children, ...rest }: PropsWithChildren<ActionLinkProps>) {
  const { cssCode } = useBankContext();

  return (
    <Link {...rest}>
      <a className={`${styles.actionLink} ${styles[cssCode]}`}>{children}</a>
    </Link>
  );
}
interface BankAccountHeaderProps {
  bankAccount: BankAccount;
}

function BankAccountHeader({ bankAccount }: BankAccountHeaderProps) {
  return (
    <div className={`${styles.header} container`}>
      <BankAccountBalance balance={bankAccount.balance} />
      <div className={styles.buttonActions}>
        <ActionLink
          href={{
            pathname: `/bank-accounts/[id]/pix/transactions/register`,
            query: { id: bankAccount.id },
          }}
        >
          Realizar transferência
        </ActionLink>

        <ActionLink
          href={{
            pathname: `/bank-accounts/[id]/pix/register`,
            query: { id: bankAccount.id },
          }}
        >
          Cadastrar chave pix
        </ActionLink>
      </div>
    </div>
  );
}

function BankAccountDashboard({
  bankAccount,
  transactions,
}: BankAccountDashboardProps) {
  return (
    <Layout>
      <BankAccountHeader bankAccount={bankAccount} />
      <div>
        <h1 className={styles.titleTable}>Últimos lançamentos</h1>

        <table
          className={`table table-borderless table-striped ${styles.tableTransactions}`}
        >
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col" colSpan={2}>
                Descrição
              </th>
              <th scope="col" className="text-right">
                Valor (R$)
              </th>
              <th scope="col" className="text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.created_at_formatted}</td>
                <td colSpan={2}>{transaction.description}</td>
                <td className="text-right">
                  {transaction.amount.toLocaleString("pt-BR")}
                </td>
                <td colSpan={2}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const [{ data: bankAccount }, { data: transactions }] = await Promise.all([
    api.get<BankAccount>(`bank-accounts/${id}`),
    api.get<Transaction[]>(`bank-accounts/${id}/transactions`),
  ]);

  return {
    props: {
      bankAccount,
      transactions: transactions.map((transaction) => {
        return {
          ...transaction,
          created_at_formatted: new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }).format(new Date(transaction.created_at)),
        };
      }),
    },
  };
};

export default BankAccountDashboard;
