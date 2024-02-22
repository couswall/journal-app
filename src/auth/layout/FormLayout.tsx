
interface FormProps {
    children?: JSX.Element[] | JSX.Element;
    onSubmitForm?: (e: React.FormEvent<HTMLFormElement>) => void; 
}

export const FormLayout = ({ children, onSubmitForm }: FormProps  )=> {
  return (
    <>
    <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <form className="p-5 rounded col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto" style={{backgroundColor: 'var(--secondary-color)'}} onSubmit={ onSubmitForm }>
           { children }
          </form>
        </div>
      </div>
    </>

    )
}
