import React from 'react'
import ConfigContextProvider from '../config/ConfigContextProvider'
import ConfigsApiContextProvider from '../config/ConfigsApiContextProvider'
import CustomersApiContextProvider from '../customers/CustomerApiContextProvider'
import DriversApiContextProvider from '../drivers/DriversApiContextProvider'
import OrdersApiContextProvider from '../orders/OrgApiContextProvider'
import OrgApiContextProvider from '../org/OrgApiContextProvider'
import RouteApiContextProvider from '../routes/RouteApiContextProvider'
import StopsApiContextProvider from '../stops/StopsApiContextProvider'
import UserApiContextProvider from '../user/UserApiContextProvider'

const ApiContextProvider = ({ children }) => {
  return (
    <ConfigsApiContextProvider>
      <ConfigContextProvider>
        <UserApiContextProvider>
          <OrgApiContextProvider>
            <DriversApiContextProvider>
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
            </DriversApiContextProvider>
          </OrgApiContextProvider>
        </UserApiContextProvider>
      </ConfigContextProvider>
    </ConfigsApiContextProvider>
  )
}

export default ApiContextProvider