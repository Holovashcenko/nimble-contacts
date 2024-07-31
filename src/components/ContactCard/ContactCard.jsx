/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types'

const ContactCard = ({ contact }) => {
  return (
    <div className="flex items-center p-4 border-b">
      <img
        src={contact.avatar_url}
        alt={`${contact.fields['first name'][0].value} ${contact.fields['last name'][0].value}`}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div className="flex-1">
        <p className="font-bold">
          {contact.fields['first name'][0].value} {contact.fields['last name'][0].value}
        </p>
        <p>{contact.fields.email[0].value}</p>
        <div className="mt-2">
          {contact.tags2.map((tag) => (
            <span key={tag} className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactCard
