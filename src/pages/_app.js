import React from 'react';
import App,{Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import initStore  from '../store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {

        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            }
        };
    }

    render() {
        const {Component, pageProps,store} = this.props;
        return (

                <Provider store={store}>
                <Container>
                    <Head>
                        <title></title>
                        <link rel="stylesheet" href="/static/bootstrap.min.css?v=1.0"/>
                        <link rel="stylesheet" href="/static/index.css?v=1.2"/>
                        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css' integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU' crossOrigin='anonymous'/>

                    </Head>
                    <PersistGate loading={<h1 className="text-center text-muted">Loading...</h1>} persistor={store.__persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                  </Container>
                </Provider>

        );
    }

}

export default withRedux(initStore)(MyApp);
