import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from './constants'
import { Contacts, ContactDetails } from '../pages'
import App from '../App'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Contacts />,
      },
      {
        path: ROUTES.CONTACT_DETAILS,
        element: <ContactDetails />,
      },
    ],
  },
])

export default router
