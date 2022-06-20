import { useState, useEffect } from 'react';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';

function App() {
  const [keyword, setKeyword] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const readHistoryContent = async () => {
    const contents = await readTextFile('.bash_history', { dir: BaseDirectory.Home });
    const commands = contents.split('\n').reverse();
    setHistory(commands);
  };

  useEffect(() => {
    readHistoryContent();
  }, []);

  return (
    <div className="bg-gray-800 absolute h-full w-full">
      <div className="pt-5 mx-5">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <input type="text" onChange={(e) => setKeyword(e.target.value)} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
        </label>
      </div>

      <div className="mt-1 overflow-auto">
        <ul className="px-5 pt-1">
          {history.filter(cmd => cmd.indexOf(keyword) > -1).map(cmd => <li className="text-white border-b-2 border-b-slate-700 pb-1">{cmd}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
