import React from 'react'
import CustomersApiContextProvider from '../customers/CustomerApiContextProvider'
import OrdersApiContextProvider from '../orders/OrgApiContextProvider'
import OrgApiContextProvider from '../org/OrgApiContextProvider'
import RouteApiContextProvider from '../routes/RouteApiContextProvider'
import StopsApiContextProvider from '../stops/StopsApiContextProvider'

const ApiContextProvider = ({ children }) => {
  return (
    <OrgApiContextProvider>
      <RouteApiContextProvider>
        <StopsApiContextProvider>
          <CustomersApiContextProvider>
            <OrdersApiContextProvider>
              <RouteApiContextProvider>
                {children}
              </RouteApiContextProvider>
            </OrdersApiContextProvider>
          </CustomersApiContextProvider>
        </StopsApiContextProvider>
      </RouteApiContextProvider>
    </OrgApiContextProvider>
  )
}

export default ApiContextProvider