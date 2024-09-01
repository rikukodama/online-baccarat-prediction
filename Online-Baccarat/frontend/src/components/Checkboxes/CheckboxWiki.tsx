
interface CheckboxWikiProps {
  showWiki: boolean;
  setShowWiki: (arg: boolean) => void;
}

const CheckboxWiki = ({ showWiki, setShowWiki }: CheckboxWikiProps) => {

  return (
    <div>
      <label
        htmlFor="checkboxWiki"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxWiki"
            className="sr-only"
            onChange={() => {
              setShowWiki(!showWiki);
            }}
          />
          <div
            className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
              showWiki && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                showWiki && '!bg-primary'
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

export default CheckboxWiki;
