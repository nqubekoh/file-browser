const path = require('path');
const fs = require('fs');


function modeToPerms(mode) {
    const permissions = ['r', 'w', 'x'];
    let result = '';

    for (let i = 8; i >= 0; i--) {
        const bitSet = (mode >> i) & 1;
        const permChar = permissions[(8 - i) % 3];
        result += bitSet ? permChar : '-';
    }

    return result;
}

module.exports = {
    Query: {
        directory: async (_, { path: dirPath, cursor, limit = 500 }) => {
            const entries = [];
            const absPath = path.resolve(dirPath);

            let started = !cursor;
            const lastName = cursor || null;
            let count = 0;

            try {
                const dir = await fs.promises.opendir(absPath);

                for await (const dirent of dir) {
                    const name = dirent.name;

                    if (!started) {
                        if (name === lastName) {
                            started = true;
                            continue;
                        } else {
                            continue;
                        }
                    }

                    const full = path.join(absPath, name);
                    let stat = null;

                    try {
                        stat = await fs.promises.lstat(full);
                    } catch (e) {
                        continue;
                    }

                    const entry = {
                        name,
                        path: full,
                        size: stat.isDirectory() ? 0 : stat.size || 0,
                        extension: stat.isDirectory()
                            ? null
                            : path.extname(name).replace('.', ''),
                        createdAt: stat.birthtime
                            ? stat.birthtime.toISOString()
                            : stat.ctime.toISOString(),
                        isDirectory: stat.isDirectory(),
                        mode: stat.mode,
                        permissions: modeToPerms(stat.mode),
                        uid: stat.uid,
                        gid: stat.gid,
                    };

                    entries.push(entry);
                    count++;

                    if (count >= limit) {
                        const nextCursor = name;
                        return { entries, nextCursor };
                    }
                }
            } catch (err) {
                throw new Error(`Failed to read directory ${absPath}: ${err.message}`);
            }

            return { entries, nextCursor: null };
        },
    },
};
