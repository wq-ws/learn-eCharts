import { ComponentInternalInstance, getCurrentInstance } from 'vue'

export const useCurrentInstance = () => {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const proxy = appContext.config.globalProperties
  return {
    proxy
  }
}