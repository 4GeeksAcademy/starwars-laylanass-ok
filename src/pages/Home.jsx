
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Home = () => {

  const {store, dispatch} = useGlobalReducer()

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <img 
        src="https://i.blogs.es/a1aa54/star/1366_2000.jpg" 
        alt="Star Wars"
        className="img-fluid"
        style={{ maxWidth: '90%', height: 'auto' }}
      />
    </div>
  )
}