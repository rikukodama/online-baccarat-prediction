
interface CheckboxMeetingProps {
  showMeeting: boolean;
  setShowMeeting: (arg: boolean) => void;
}

const CheckboxMeeting = ({ showMeeting, setShowMeeting }: CheckboxMeetingProps) => {

  return (
    <div>
      <label
        htmlFor="checkboxMeeting"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxMeeting"
            className="sr-only"
            onChange={() => {
              setShowMeeting(!showMeeting);
            }}
          />
          <div
            className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
              showMeeting && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                showMeeting && '!bg-primary'
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

export default CheckboxMeeting;
