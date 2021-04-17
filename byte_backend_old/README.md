# byte_backend
Backend code for MedByte.

## Environment

We use Conda to manage the virtual environment.
You can install Conda [here](https://docs.conda.io/projects/conda/en/latest/user-guide/install/).

**IMPORTANT**:

- Before executing commands, make sure your working directory
is the topmost directory
(e.g. `/Users/saar/Desktop/medbyte/byte_backend/`.
- Make sure that the correct Conda environment is activated.
- Ensure MySQL is installed and added to your path and run `pip3 install mysqlclient`.

### Installation

```shell
# Install the conda environments.
conda env create --file=environment.yml
# Activate the conda environment.
conda activate byte-backend
```

### Activating

```shell
# Activate the conda environment.
conda activate byte-backend
```

### Updating

```shell
# Activate the conda environment.
conda activate byte-backend
# Update the environment.
conda env update --file=environment.yml
```

### Deactivating

```shell
conda deactivate
```
