echo "Hello Build stated!"
echo " time to build the project"
echo "System information: $(uname -a)"
echo "Current directory: $(pwd)"
python3 cicd/ci.py

echo "Hello Build completed!"