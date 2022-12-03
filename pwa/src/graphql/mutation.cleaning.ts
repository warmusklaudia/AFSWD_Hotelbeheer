import gql from 'graphql-tag'

export const UPDATE_CLEANING = gql`
  mutation updateCleaning($updateCleaningInput: UpdateCleaningInput!) {
    updateCleaning(updateCleaningInput: $updateCleaningInput) {
      cleaningId
      changeTheLinens
      clearTheTrash
      disinfectSurfaces
      cleanTheBathroom
      vacuumTheFloor
      mopTheFloor
      finish
      finishDate
      cleanedBy {
        id
      }
    }
  }
`
