import PropTypes from 'prop-types'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUpdateContactTagsMutation } from '../../redux/features/api/apiSlice'

const AddTagsForm = ({ oldTags = [], onTagsUpdated }) => {
  const { id } = useParams()
  const [tags, setTags] = useState('')
  const [updateContactTags, { isLoading, isError, error, isSuccess }] = useUpdateContactTagsMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const combinedTags = Array.from(new Set([...oldTags, ...newTags]))

    try {
      await updateContactTags({ id, tags: combinedTags }).unwrap()
      setTags('')
      onTagsUpdated()
    } catch (err) {
      console.error('Failed to update tags: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter tags separated by commas"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Tags'}
      </button>
      {isSuccess && <p className="text-green-500">Tags updated successfully!</p>}
      {isError && <p className="text-red-500">{error.message}</p>}
    </form>
  )
}

AddTagsForm.propTypes = {
  oldTags: PropTypes.arrayOf(PropTypes.string),
  onTagsUpdated: PropTypes.func.isRequired,
}

export default AddTagsForm
