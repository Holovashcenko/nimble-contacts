import { useState } from 'react'
import PropTypes from 'prop-types'
import { useCreateContactMutation } from '../../redux/features/api/apiSlice'

const CreateContactForm = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [createContact] = useCreateContactMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName && !lastName) {
      setError('At least one of First Name or Last Name is required.')
      return
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('A valid email is required.')
      return
    }

    setError('')

    try {
      await createContact({
        fields: {
          'first name': [{ value: firstName, modifier: '', label: 'first name' }],
          'last name': [{ value: lastName, modifier: '', label: 'last name' }],
          email: [{ value: email, modifier: '', label: 'email' }],
        },
        record_type: 'person',
        privacy: { edit: null, read: null },
        owner_id: null,
      }).unwrap()
      setFirstName('')
      setLastName('')
      setEmail('')
      onSuccess()
    } catch (error) {
      setError('Failed to create the contact.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="sticky top-0 left-0 w-80 bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Create New Contact</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Create Contact
      </button>
    </form>
  )
}

CreateContactForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default CreateContactForm
