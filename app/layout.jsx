import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Welcome to the store!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-backcolor'>
      <body className={inter.className}>
            {children}   
            <ToastContainer
          position="top-left"
          autoClose={1000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />    
      </body>
    </html>
  )
}
