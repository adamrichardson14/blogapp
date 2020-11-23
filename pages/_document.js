import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ToastContainer } from 'react-toastify';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main>
            <ToastContainer
              position='bottom-center'
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
