import os
import subprocess
import math
import datetime

folders = [
    "AUREON",
    "FASHION",
    "OAK",
    "TEMPLATES",
    "WEBDEVELOPER",
    "bright-teeth-care",
    "luminous-beauty-studio"
]

def run_cmd(cmd, env=None, **kwargs):
    return subprocess.run(cmd, check=True, text=True, env=env, **kwargs)

def main():
    if not os.path.exists(".git"):
        run_cmd(["git", "init"])
        
    try:
        run_cmd(["git", "remote", "add", "origin", "https://github.com/aseesmakkar45/WEBTEMPLATES.git"])
    except subprocess.CalledProcessError:
        run_cmd(["git", "remote", "set-url", "origin", "https://github.com/aseesmakkar45/WEBTEMPLATES.git"])

    try:
        run_cmd(["git", "checkout", "-b", "main"])
    except:
        pass

    res_untracked = subprocess.run(["git", "ls-files", "--others", "--exclude-standard"], capture_output=True, text=True)
    res_modified = subprocess.run(["git", "ls-files", "-m"], capture_output=True, text=True)
    
    all_files_in_git = set(res_untracked.stdout.splitlines() + res_modified.stdout.splitlines())

    # We want timestamps between May 5, 2026 and May 19, 2026
    start_date = datetime.datetime(2026, 5, 5, 10, 0, 0)
    commit_idx = 0

    for folder in folders:
        if not os.path.isdir(folder):
            continue
            
        prefix = folder + "/"
        folder_files = sorted([f for f in all_files_in_git if f.startswith(prefix) or f.startswith(folder + "\\")])
        
        if not folder_files:
            continue
            
        num_commits = 12
        chunk_size = math.ceil(len(folder_files) / num_commits)
        
        if chunk_size == 0:
            chunk_size = 1
            
        chunks = [folder_files[i:i + chunk_size] for i in range(0, len(folder_files), chunk_size)]
        
        for idx, chunk in enumerate(chunks, 1):
            if not chunk:
                continue
            
            batch = []
            batch_len = 0
            for file in chunk:
                if batch_len + len(file) > 7000:
                    subprocess.run(["git", "add"] + batch, check=True)
                    batch = []
                    batch_len = 0
                batch.append(file)
                batch_len += len(file) + 1
            
            if batch:
                subprocess.run(["git", "add"] + batch, check=True)
            
            # Make the commit with a specific date
            # Advance time by roughly 4 hours
            commit_date = start_date + datetime.timedelta(hours=(commit_idx * 4))
            date_str = commit_date.strftime("%Y-%m-%dT%H:%M:%S")
            
            env = os.environ.copy()
            env["GIT_AUTHOR_DATE"] = date_str
            env["GIT_COMMITTER_DATE"] = date_str
            
            try:
                run_cmd(["git", "commit", "-m", f"feat: Add files to {folder} part {idx}/{len(chunks)}"], env=env)
            except subprocess.CalledProcessError:
                pass
                
            commit_idx += 1

    # Add anything remaining like .gitignore
    subprocess.run(["git", "add", "."], check=True)
    try:
        final_date = start_date + datetime.timedelta(hours=(commit_idx * 4))
        date_str = final_date.strftime("%Y-%m-%dT%H:%M:%S")
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
        run_cmd(["git", "commit", "-m", "chore: setup project and gitignore"], env=env)
    except:
        pass

if __name__ == "__main__":
    main()
