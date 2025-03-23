import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from "./Layout/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "../css/app.css"


createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = page.default.layout || (page => <Layout children={page} />)
        return page

    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        delay: 250,
        color: 'black',
        includeCSS: true,
        showSpinner: false,
    },
})