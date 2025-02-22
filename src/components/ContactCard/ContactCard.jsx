import PropTypes from 'prop-types'
import { useDeleteContactMutation } from '../../redux/features/api/apiSlice'
import { Link } from 'react-router-dom'

const ContactCard = ({ contact, onDelete }) => {
  const [deleteContact] = useDeleteContactMutation()

  if (!contact) {
    return <div>No contact data available</div>
  }

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id).unwrap()
      onDelete()
    } catch (error) {
      console.error('Failed to delete the contact: ', error)
    }
  }

  const firstName = contact.fields['first name']?.[0]?.value || 'No First Name'
  const lastName = contact.fields['last name']?.[0]?.value || 'No Last Name'
  const email = contact.fields.email?.[0]?.value || 'No Email'

  return (
    <div className="relative flex items-center p-4 border-b bg-white rounded-lg shadow m-4">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600"
        aria-label="Delete"
      >
        <span className="material-icons">delete</span>
      </button>

      <img src={contact.avatar_url} alt={`${firstName} ${lastName}`} className="w-16 h-16 rounded-full mr-4" />
      <div className="flex-1">
        <Link to={`/contact/${contact.id}`}>
          <p className="font-bold">
            {firstName} {lastName}
          </p>
        </Link>
        <p>{email}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {contact.tags2?.length > 0 ? (
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
  )
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar_url: PropTypes.string,
    fields: PropTypes.shape({
      'first name': PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
      'last name': PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
      email: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
    }),
    tags2: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ContactCard
