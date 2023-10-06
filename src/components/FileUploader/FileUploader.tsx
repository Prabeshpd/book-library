import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface PropTypes {
  handleChange: (file: File) => void;
  isLoading: boolean;
  progressPercent?: number;
}

const FileUploader = (props: PropTypes) => {
  const { isLoading, handleChange, progressPercent } = props;

  const onChange = async (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      const currentFile = event.currentTarget.files[0];
      handleChange(currentFile);
    }
  };

  return (
    <div className="file-upload">
      {(!isLoading && (
        <div className="file-upload__header">
          Upload Profile Picture
          <div className="file-upload__body">
            <label className="file-upload__label">
              <span>Upload a file</span>
              <input
                name="keywords"
                type="file"
                data-test-id="file-upload-input"
                className="file-upload__input"
                onChange={onChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
      )) || <ClipLoader aria-label="application-loader" />}

      {(progressPercent && (
        <div className="file-upload__footer">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: progressPercent }}></div>
          </div>
        </div>
      )) || <></>}
    </div>
  );
};

export default FileUploader;
