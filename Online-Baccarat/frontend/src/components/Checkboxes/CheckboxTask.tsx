
interface CheckboxTaskProps {
  showTask: boolean;
  setShowTask: (arg: boolean) => void;
}

const CheckboxTask = ({ showTask, setShowTask }: CheckboxTaskProps) => {

  return (
    <div>
      <label
        htmlFor="checkboxTask"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxTask"
            className="sr-only"
            onChange={() => {
              setShowTask(!showTask);
            }}
          />
          <div
            className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
              showTask && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                showTask && '!bg-primary'
              }`}
            >
              {' '}
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default CheckboxTask;
