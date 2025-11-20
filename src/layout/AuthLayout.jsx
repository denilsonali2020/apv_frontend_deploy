import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <main className="min-h-screen flex justify-center items-center p-5 bg-gray-100">
            <div className="w-full max-w-4xl md:grid md:grid-cols-2 gap-12 items-center">
                <Outlet />
            </div>
        </main>
    </>
  );
};

export default AuthLayout;
{/* <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center">
    <Outlet />
</main> */}