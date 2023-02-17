import UseFetch from "../util/UseFetch"

const setTester = (endpoint = '') => {
    const [data, isPending, error] = UseFetch(endpoint)

    return {
      type: 'READ',
      payload: [data, isPending, error] 
    }
}
export default setTester