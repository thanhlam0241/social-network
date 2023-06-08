import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'
import { store } from '~/service/redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </QueryClientProvider>
)
