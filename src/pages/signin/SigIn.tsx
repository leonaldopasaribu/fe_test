import PageMeta from '../../components/common/PageMeta';
import SignInLayout from './SignInLayout';
import SignInForm from './components/SignInForm';

export default function SignIn() {
  return (
    <div className="">
      <PageMeta title="Sign In Dashboard" description="" />
      <SignInLayout>
        <SignInForm />
      </SignInLayout>
    </div>
  );
}
