import { BASE_URL } from '../lib/api';
import React, { useState, useEffect } from 'react';

const ChildReport = () => {
  const [teams, setTeams] = useState([]);
  const [activeSection, setActiveSection] = useState('teams');
  const [teamForm, setTeamForm] = useState({ name: '' });
  const [memberForm, setMemberForm] = useState({ teamId: '', name: '', email: '' });
  const [taskForm, setTaskForm] = useState({ teamId: '', memberId: '', title: '', description: '', status: 'Pending' });
  const [editItem, setEditItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'team', 'member', 'task', 'delete-team', 'delete-member', 'delete-task'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch teams on mount
  useEffect(() => {
    fetchTeams();
  }, []);

  const getToken = () => localStorage.getItem('token');

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/report', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized access. Please login.');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch teams: ${err.message}`);
      console.error('Fetch teams error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle team form submission (create/update)
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editItem ? `http://localhost:3001/api/report/${editItem._id}` : 'http://localhost:3001/api/report';
      const method = editItem ? 'PUT' : 'POST';
      console.log('Team submit:', { url, method, data: teamForm });
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(teamForm),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setTeamForm({ name: '' });
        setEditItem(null);
        setModalType(null);
        fetchTeams();
      } else {
        setError(result.error || 'Failed to process team');
        console.error('Team submit error:', result);
      }
    } catch (err) {
      setError(editItem ? `Error updating team: ${err.message}` : `Error creating team: ${err.message}`);
      console.error('Team submit error:', err);
    }
  };

  // Handle member form submission (create/update)
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editItem
        ? `http://localhost:3001/api/report/${memberForm.teamId}/member/${editItem._id}`
        : 'http://localhost:3001/api/report/addMember';
      const method = editItem ? 'PUT' : 'POST';
      console.log('Member submit:', { url, method, data: memberForm });
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(memberForm),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setMemberForm({ teamId: '', name: '', email: '' });
        setEditItem(null);
        setModalType(null);
        fetchTeams();
      } else {
        setError(result.error || 'Failed to process member');
        console.error('Member submit error:', result);
      }
    } catch (err) {
      setError(editItem ? `Error updating member: ${err.message}` : `Error adding member: ${err.message}`);
      console.error('Member submit error:', err);
    }
  };

  // Handle task form submission (create/update)
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editItem
        ? `http://localhost:3001/api/report/${taskForm.teamId}/task/${editItem._id}`
        : 'http://localhost:3001/api/report/addTask';
      const method = editItem ? 'PUT' : 'POST';
      console.log('Task submit:', { url, method, data: taskForm });
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(taskForm),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setTaskForm({ teamId: '', memberId: '', title: '', description: '', status: 'Pending' });
        setEditItem(null);
        setModalType(null);
        fetchTeams();
      } else {
        setError(result.error || 'Failed to process task');
        console.error('Task submit error:', result);
      }
    } catch (err) {
      setError(editItem ? `Error updating task: ${err.message}` : `Error assigning task: ${err.message}`);
      console.error('Task submit error:', err);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      let url;
      let type;
      if (modalType === 'delete-team') {
        url = `http://localhost:3001/api/report/${editItem._id}`;
        type = 'team';
      } else if (modalType === 'delete-member') {
        if (!memberForm.teamId || !editItem._id) {
          throw new Error('Missing teamId or memberId');
        }
        url = `http://localhost:3001/api/report/${memberForm.teamId}/member/${editItem._id}`;
        type = 'member';
      } else if (modalType === 'delete-task') {
        if (!taskForm.teamId || !editItem._id) {
          throw new Error('Missing teamId or taskId');
        }
        url = `http://localhost:3001/api/report/${taskForm.teamId}/task/${editItem._id}`;
        type = 'task';
      } else {
        throw new Error('Invalid modal type for deletion');
      }
      console.log('Delete request:', { url, method: 'DELETE', type, editItem });
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const result = await res.json();
      console.log('Delete response:', { status: res.status, result });
      if (res.ok) {
        alert(result.message || `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        setEditItem(null);
        setModalType(null);
        setMemberForm({ teamId: '', name: '', email: '' });
        setTaskForm({ teamId: '', memberId: '', title: '', description: '', status: 'Pending' });
        fetchTeams();
      } else {
        setError(result.error || `Failed to delete ${type}`);
        console.error('Delete error:', result);
      }
    } catch (err) {
      setError(`Error deleting item: ${err.message}`);
      console.error('Delete error:', err);
    }
  };

  // Open modal for editing
  const openEditModal = (type, item, teamId = '') => {
    setModalType(type);
    setEditItem(item);
    if (type === 'team') {
      setTeamForm({ name: item.name || '' });
    } else if (type === 'member') {
      setMemberForm({ teamId: teamId || '', name: item.name || '', email: item.email || '' });
    } else if (type === 'task') {
      setTaskForm({
        teamId: teamId || '',
        memberId: item.memberId ? item.memberId.toString() : '',
        title: item.title || '',
        description: item.description || '',
        status: item.status || 'Pending',
      });
    }
    console.log('Opening edit modal:', { type, item, teamId });
  };

  // Open delete modal
  const openDeleteModal = (type, item, teamId = '') => {
    setModalType(`delete-${type}`);
    setEditItem(item);
    if (type === 'member') {
      setMemberForm({ ...memberForm, teamId: teamId || '' });
    } else if (type === 'task') {
      setTaskForm({ ...taskForm, teamId: teamId || '' });
    }
    console.log('Opening delete modal:', { type: `delete-${type}`, item, teamId });
  };

  // Close modal
  const closeModal = () => {
    setModalType(null);
    setEditItem(null);
    setTeamForm({ name: '' });
    setMemberForm({ teamId: '', name: '', email: '' });
    setTaskForm({ teamId: '', memberId: '', title: '', description: '', status: 'Pending' });
    setError(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveSection('teams')}
            className={`w-full text-left p-4 flex items-center space-x-2 ${
              activeSection === 'teams'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 6a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8zm-4 4a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4z" />
            </svg>
            <span>Teams</span>
          </button>
          <button
            onClick={() => setActiveSection('members')}
            className={`w-full text-left p-4 flex items-center space-x-2 ${
              activeSection === 'members'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0h-2a5 5 0 00-10 0H3z" />
            </svg>
            <span>Members</span>
          </button>
          <button
            onClick={() => setActiveSection('tasks')}
            className={`w-full text-left p-4 flex items-center space-x-2 ${
              activeSection === 'tasks'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm3 4h10v2H5V7zm0 4h10v2H5v-2zm0 4h6v2H5v-2z" />
            </svg>
            <span>Tasks</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
            </svg>
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a7 7 0 017 7h-2a5 5 0 00-5-5V3z" />
            </svg>
            Loading...
          </div>
        )}

        {/* Teams Section */}
        {activeSection === 'teams' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h2>
              <button
                onClick={() => setModalType('team')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                + Add Team
              </button>
            </div>
            {teams.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No teams created yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <div
                    key={team._id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Members: {team.members.length} | Tasks: {team.tasks.length}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal('team', team)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal('team', team)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Members Section */}
        {activeSection === 'members' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Members</h2>
              <button
                onClick={() => setModalType('member')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                + Add Member
              </button>
            </div>
            {teams.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No teams available to add members.</p>
            ) : (
              teams.map((team) => (
                <div key={team._id} className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{team.name}</h3>
                  {team.members.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No members in this team.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {team.members.map((member) => (
                        <div
                          key={member._id}
                          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{member.email}</p>
                          <div className="mt-4 flex space-x-2">
                            <button
                              onClick={() => openEditModal('member', member, team._id)}
                              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal('member', member, team._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tasks Section */}
        {activeSection === 'tasks' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h2>
              <button
                onClick={() => setModalType('task')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                + Add Task
              </button>
            </div>
            {teams.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No teams available to assign tasks.</p>
            ) : (
              teams.map((team) => (
                <div key={team._id} className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{team.name}</h3>
                  {team.tasks.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No tasks assigned.</p>
                  ) : (
                    <div className="space-y-4">
                      {team.tasks.map((task) => (
                        <div
                          key={task._id}
                          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              Assigned to: {team.members.find((m) => m._id.toString() === task.memberId.toString())?.name || 'Unknown'}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">Status: {task.status}</p>
                            {task.description && (
                              <p className="text-gray-600 dark:text-gray-400">Description: {task.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal('task', task, team._id)}
                              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal('task', task, team._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal */}
        {modalType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
              {modalType === 'team' && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {editItem ? 'Edit Team' : 'Create Team'}
                  </h2>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <input
                      name="name"
                      placeholder="Team Name"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        {editItem ? 'Update' : 'Create'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
              {modalType === 'member' && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {editItem ? 'Edit Member' : 'Add Member'}
                  </h2>
                  <form onSubmit={handleMemberSubmit} className="space-y-4">
                    <select
                      name="teamId"
                      value={memberForm.teamId}
                      onChange={(e) => setMemberForm({ ...memberForm, teamId: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      disabled={editItem}
                    >
                      <option value="">Select Team</option>
                      {teams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <input
                      name="name"
                      placeholder="Member Name"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Member Email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        {editItem ? 'Update' : 'Add'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
              {modalType === 'task' && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {editItem ? 'Edit Task' : 'Assign Task'}
                  </h2>
                  <form onSubmit={handleTaskSubmit} className="space-y-4">
                    <select
                      name="teamId"
                      value={taskForm.teamId}
                      onChange={(e) => setTaskForm({ ...taskForm, teamId: e.target.value, memberId: '' })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      disabled={editItem}
                    >
                      <option value="">Select Team</option>
                      {teams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="memberId"
                      value={taskForm.memberId}
                      onChange={(e) => setTaskForm({ ...taskForm, memberId: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      disabled={!taskForm.teamId}
                    >
                      <option value="">Select Member</option>
                      {taskForm.teamId &&
                        teams
                          .find((team) => team._id === taskForm.teamId)
                          ?.members.map((member) => (
                            <option key={member._id} value={member._id}>
                              {member.name}
                            </option>
                          ))}
                    </select>
                    <input
                      name="title"
                      placeholder="Task Title"
                      value={taskForm.title}
                      onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Task Description"
                      value={taskForm.description}
                      onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[100px]"
                    />
                    <select
                      name="status"
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        {editItem ? 'Update' : 'Assign'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
              {(modalType === 'delete-team' || modalType === 'delete-member' || modalType === 'delete-task') && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Are you sure you want to delete this {editItem.name || editItem.title || 'item'}?
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDelete}
                      className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildReport;
