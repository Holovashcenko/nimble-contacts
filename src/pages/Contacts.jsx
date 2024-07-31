import ContactCard from '../components/ContactCard/ContactCard'
import { useGetContactsQuery } from '../redux/features/api/apiSlice'

const Contacts = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <ul className="mt-4">
        {contacts.map((contact, idx) => (
          <ContactCard key={idx} contact={contact} />
        ))}
      </ul>
    </div>
  )
}

export default Contacts
