import PageMeta from '../../components/common/PageMeta';
import SignInLayout from './SignInLayout';
import SignInForm from './components/SignInForm';

export default function SignIn() {
  return (
    <div className="">
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <SignInLayout>
        <SignInForm />
      </SignInLayout>
    </div>
  );
}
