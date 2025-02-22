import { useParams, useNavigate } from 'react-router-dom'
import { useGetContactQuery } from '../redux/features/api/apiSlice'
import AddTagsForm from '../components/AddTagsForm/AddTagsForm'

const ContactDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: contact, error, isLoading, refetch } = useGetContactQuery(id)

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <div className="p-4">
      <button onClick={() => navigate('/')} className="mb-4 text-blue-500 hover:text-blue-700">
        &larr; Back
      </button>
      <h1 className="text-2xl font-bold">Contact Details</h1>
      <div className="flex items-center mt-4">
        <img
          src={contact.avatar_url}
          alt={`${contact.fields['first name'][0].value} ${contact.fields['last name'][0].value}`}
          className="w-32 h-32 rounded-full"
        />
        <div className="ml-4">
          <p className="text-xl font-semibold">
            {contact.fields['first name'][0].value} {contact.fields['last name'][0].value}
          </p>
          <p>{contact.fields.email[0].value}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {contact.tags2.length > 0 ? (
              contact.tags2.map((tag) => (
                <span key={tag} className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No Tags</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <AddTagsForm oldTags={contact.tags2} onTagsUpdated={() => refetch()} />
      </div>
    </div>
  )
}

export default ContactDetails
