import React, {Fragment} from 'react'
import ActiveStorageProvider from 'react-activestorage-provider'

import {NGROK} from '../../constants'

const ASProvider = ({method, model}) => {
  let fileName
  model === 'user' ? fileName = 'profile' : fileName = 'file'
  return (
    <ActiveStorageProvider
    endpoint={{
    path: `api/vi/${model}`,
    model: model,
    host: NGROK,
    attribute: fileName,
    method: 'POST'
    }}

    onSuccess={(e) => method(e)}
    onSubmit={(e) => method(e)}
    render={({ handleUpload, uploads, ready }) => (
      <div>
        <input
          type="file"
          disabled={!ready}
          onChange={e => {
            return handleUpload(e.currentTarget.files)}}
        />

      {uploads.map(upload => {
        switch (upload.state) {
          case 'waiting':
            return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
          case 'uploading':
            return (
              <p key={upload.id}>
                Uploading {upload.file.name}: {upload.progress}%
              </p>
            )
          case 'error':
            return (
              <Fragment>
              <p key={upload.id}>
                Error uploading {upload.file.name}: {upload.error}
              </p>
              </Fragment>
            )
          case 'finished':
            return (
              <Fragment>
              {method(upload)}
              <p key={upload.id}>Finished uploading {upload.file.name}</p>
              </Fragment>)

          default:
          return null;
        }
      })}
    </div>
  )}
  />
)}

export default ASProvider 
