import { useState } from 'react'
import ContactCard from '../components/ContactCard/ContactCard'
import { useGetContactsQuery } from '../redux/features/api/apiSlice'

const Contacts = () => {
  const [sort, setSort] = useState('created:desc')
  const { data: contacts, error, isLoading, refetch } = useGetContactsQuery({ sort })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contacts</h1>

      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>

        <select id="sort" value={sort} onChange={handleSortChange} className="border p-2">
          <option value="created:desc">Newest First</option>
          <option value="created:asc">Oldest First</option>
          <option value="name:asc">Name (A-Z)</option>
          <option value="name:desc">Name (Z-A)</option>
        </select>
      </div>

      <ul className="mt-4 space-y-4">
        {contacts.map((contact, idx) => (
          <ContactCard key={idx} contact={contact} onDelete={() => refetch()} />
        ))}
      </ul>
    </div>
  )
}

export default Contacts
